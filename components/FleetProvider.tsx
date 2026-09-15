"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

export type FleetBus = {
  id: string;
  name: string;
  plateNumber: string;
  chassisNumber: string;
  engineNumber: string;
  make: string;
  model: string;
  year: number | string;
  color: string;
  seats: number;
  mileage: string;
  assignedRouteId: string | null;
  assignedRouteName: string | null;
  driver: {
    name: string;
    licenseNumber: string;
    nationalId: string;
  };
  company: {
    name: string;
    registrationNumber: string;
    contactPerson: string;
    phone: string;
  };
  documents: {
    vehicleRegistration: string;
    roadworthinessCertificate: string;
    insuranceCertificate: string;
    operatingLicense: string;
  };
  safetyEquipment: {
    fireExtinguisher: boolean;
    firstAidKit: boolean;
    emergencyTriangle: boolean;
    reflectiveVest: boolean;
    speedLimiter: boolean;
    gpsTracker: boolean;
  };
  status: string;
  statusColor: string;
  lastMaintenance: string;
  nextMaintenance: string;
};

type FleetContextValue = {
  buses: FleetBus[];
  loading: boolean;
  refresh: () => Promise<void>;
  addBus: (bus: Omit<FleetBus, "id"> | Record<string, unknown>) => Promise<void>;
  updateBus: (bus: FleetBus) => Promise<void>;
  deleteBus: (id: string) => Promise<void>;
  assignBusesToRoute: (routeId: string, routeLabel: string, busIds: string[]) => Promise<void>;
};

const FleetContext = createContext<FleetContextValue | null>(null);

function asDay(value: unknown) {
  if (!value) return "";
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10);
}

function normalizeBus(bus: Record<string, any>): FleetBus {
  const documents = bus.documents || {};
  const safety = bus.safetyEquipment || {};
  return {
    id: String(bus.id),
    name: bus.name || "Unnamed bus",
    plateNumber: bus.plateNumber || "",
    chassisNumber: bus.chassisNumber || "",
    engineNumber: bus.engineNumber || "",
    make: bus.make || "",
    model: bus.model || "",
    year: bus.year || new Date().getFullYear(),
    color: bus.color || "",
    seats: Number(bus.seats) || 50,
    mileage: bus.mileage || "0 km",
    assignedRouteId: bus.assignedRouteId || null,
    assignedRouteName: bus.assignedRouteName || null,
    driver: {
      name: bus.driver?.name || bus.driverName || "",
      licenseNumber: bus.driver?.licenseNumber || bus.driverLicense || "",
      nationalId: bus.driver?.nationalId || bus.driverNationalId || "",
    },
    company: {
      name: bus.company?.name || "",
      registrationNumber: bus.company?.registrationNumber || "",
      contactPerson: bus.company?.contactPerson || "",
      phone: bus.company?.phone || "",
    },
    documents: {
      vehicleRegistration: documents.vehicleRegistration || "Uploaded",
      roadworthinessCertificate: documents.roadworthinessCertificate || "Uploaded",
      insuranceCertificate: documents.insuranceCertificate || "Uploaded",
      operatingLicense: documents.operatingLicense || "Uploaded",
    },
    safetyEquipment: {
      fireExtinguisher: Boolean(safety.fireExtinguisher),
      firstAidKit: Boolean(safety.firstAidKit),
      emergencyTriangle: Boolean(safety.emergencyTriangle),
      reflectiveVest: Boolean(safety.reflectiveVest),
      speedLimiter: Boolean(safety.speedLimiter),
      gpsTracker: safety.gpsTracker !== false,
    },
    status: bus.status || "Active",
    statusColor: bus.statusColor || statusColorFor(bus.status || "Active"),
    lastMaintenance: asDay(bus.lastMaintenance),
    nextMaintenance: asDay(bus.nextMaintenance),
  };
}

export function FleetProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [buses, setBuses] = useState<FleetBus[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (user?.role !== "COMPANY_ADMIN" && user?.role !== "SUPER_ADMIN") {
      setBuses([]);
      return;
    }
    setLoading(true);
    try {
      const data = await api<Record<string, any>[]>("/api/admin/buses");
      setBuses((data || []).map(normalizeBus));
    } catch {
      setBuses([]);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addBus = useCallback(
    async (bus: Omit<FleetBus, "id"> | Record<string, unknown>) => {
      const payload = bus as Record<string, any>;
      await api("/api/admin/buses", {
        method: "POST",
        body: JSON.stringify({
          companyId: payload.companyId,
          name: payload.name,
          plateNumber: payload.plateNumber,
          chassisNumber: payload.chassisNumber,
          engineNumber: payload.engineNumber,
          make: payload.make,
          model: payload.model,
          year: payload.year,
          color: payload.color,
          seats: payload.seats,
          driverName: payload.driver?.name || payload.driverName,
          driverLicense: payload.driver?.licenseNumber || payload.driverLicense,
          driverNationalId: payload.driver?.nationalId || payload.driverNationalId,
          documents: payload.documents,
          safetyEquipment: payload.safetyEquipment,
        }),
      });
      await refresh();
    },
    [refresh]
  );

  const updateBus = useCallback(
    async (bus: FleetBus) => {
      await api("/api/admin/buses", {
        method: "PUT",
        body: JSON.stringify({
          id: bus.id,
          name: bus.name,
          plateNumber: bus.plateNumber,
          make: bus.make,
          model: bus.model,
          year: bus.year,
          color: bus.color,
          seats: bus.seats,
          driverName: bus.driver.name,
          driverLicense: bus.driver.licenseNumber,
          driverNationalId: bus.driver.nationalId,
          status: bus.status,
        }),
      });
      await refresh();
    },
    [refresh]
  );

  const deleteBus = useCallback(
    async (id: string) => {
      await api(`/api/admin/buses?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      await refresh();
    },
    [refresh]
  );

  const assignBusesToRoute = useCallback(
    async (routeId: string, _routeLabel: string, busIds: string[]) => {
      await api("/api/admin/assign", {
        method: "POST",
        body: JSON.stringify({ routeId, busIds }),
      });
      await refresh();
    },
    [refresh]
  );

  const value = useMemo(
    () => ({ buses, loading, refresh, addBus, updateBus, deleteBus, assignBusesToRoute }),
    [buses, loading, refresh, addBus, updateBus, deleteBus, assignBusesToRoute]
  );

  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>;
}

export function useFleet() {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error("useFleet must be used within FleetProvider");
  }
  return context;
}

export function statusColorFor(status: string) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-800";
    case "Maintenance":
      return "bg-amber-50 text-amber-800";
    default:
      return "bg-navy-50 text-navy-700";
  }
}

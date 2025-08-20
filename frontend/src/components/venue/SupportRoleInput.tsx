"use client";

import { useState } from "react";
import { supportOptions } from "@/data/constants";

interface RoleEntry {
  role: string;
  count: number;
}

interface SupportRoleInputProps {
  setSupportRoles: (roles: RoleEntry[]) => void;
}

const SupportRoleInput = ({ setSupportRoles }: SupportRoleInputProps) => {
  const [selectedRoles, setSelectedRoles] = useState<RoleEntry[]>([]);

  const toggleRole = (role: string) => {
    const exists = selectedRoles.find((r) => r.role === role);
    let updated: RoleEntry[];

    if (exists) {
      updated = selectedRoles.filter((r) => r.role !== role);
    } else {
      updated = [...selectedRoles, { role, count: 1 }];
    }

    setSelectedRoles(updated);
    setSupportRoles(updated);
  };

  const handleCountChange = (role: string, value: number) => {
    const updated = selectedRoles.map((r) =>
      r.role === role ? { ...r, count: value } : r
    );
    setSelectedRoles(updated);
    setSupportRoles(updated);
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium">Support Roles (Optional)</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {supportOptions.map((role) => {
          const selected = selectedRoles.find((r) => r.role === role);
          return (
            <div key={role} className="flex flex-col space-y-1">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={() => toggleRole(role)}
                  className="accent-green-500"
                />
                <span>{role}</span>
              </label>
              {selected && (
                <input
                  type="number"
                  min={1}
                  value={selected.count}
                  onChange={(e) =>
                    handleCountChange(role, parseInt(e.target.value) || 1)
                  }
                  className="w-20 border rounded px-2 py-1 text-sm"
                  placeholder="Count"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportRoleInput;

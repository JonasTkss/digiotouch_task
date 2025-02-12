import React from "react";
import * as MuiIcons from "@mui/icons-material";

export const renderIcon = (iconName: string, colorClass: string) => {
  const Icon = (MuiIcons as any)[iconName];

  if (!Icon) {
    return null;
  }

  return <Icon className={`${colorClass}`} />;
};

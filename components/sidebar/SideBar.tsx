"use client";
import React from "react";
import { Paper, Typography, Divider, Box } from "@mui/material";
import { workflowElements } from "@/utils/workflowData";
import { WorkflowItem } from "@/types/workflow";

const SideBar = () => {
  const handleDragStart = (e: React.DragEvent, item: WorkflowItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <Paper
      elevation={3}
      className="w-[400px] h-screen overflow-y-auto"
      sx={{
        borderRadius: "8px 0 0 8px",
        backgroundColor: "var(--workflow-bg)",
        boxShadow: "0 4px 12px var(--workflow-shadow)",
      }}
    >
      <Box
        className="p-6 border-b"
        sx={{
          background:
            "linear-gradient(135deg, var(--workflow-gradient-from) 0%, var(--workflow-gradient-to) 100%)",
          borderBottom: "1px solid var(--workflow-border)",
        }}
      >
        <Typography
          variant="h6"
          className="font-semibold text-workflow-textLight mb-1"
        >
          Workflow Elements
        </Typography>
        <Typography
          variant="body2"
          className="text-workflow-textBlue opacity-90"
        >
          Drag elements to the canvas
        </Typography>
      </Box>

      <Box className="p-6 space-y-8">
        {workflowElements.map((category) => (
          <Box key={category.category}>
            <Typography
              variant="subtitle2"
              className="font-medium text-workflow-textGray mb-4 tracking-wide uppercase text-sm"
            >
              {category.category}
            </Typography>
            <Box className="space-y-3">
              {category.items.map((item) => (
                <Paper
                  key={item.name}
                  elevation={0}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-4 rounded-lg cursor-pointer transition-all duration-300
                    border border-workflow-borderLight hover:border-workflow-borderHover
                    hover:shadow-lg hover:bg-workflow-itemBg"
                  sx={{
                    backgroundColor: "var(--workflow-item-bg)",
                    "&:active": {
                      transform: "scale(0.99)",
                      backgroundColor: "var(--workflow-item-active)",
                    },
                  }}
                >
                  <Box className="flex items-center gap-4">
                    <Box className="rounded-lg w-10 h-10 flex justify-center items-center bg-workflow-iconBg">
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        className="font-medium text-workflow-textGray mb-0.5"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-workflow-textGray500 leading-snug block"
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ backgroundColor: "var(--workflow-divider)" }} />
      <Box className="p-6 bg-gradient-to-b from-workflow-itemBg to-workflow-itemActive text-center">
        <Typography variant="caption" className="text-workflow-textGray500">
          Drag and drop elements to create your workflow
        </Typography>
      </Box>
    </Paper>
  );
};

export default SideBar;

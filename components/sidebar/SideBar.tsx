"use client";
import React from "react";
import { Paper, Typography, Divider, Box, IconButton } from "@mui/material";
import { workflowElements } from "@/utils/workflowData";
import { WorkflowItem } from "@/types/workflow";

const SideBar = () => {
  const handleDragStart = (e: React.DragEvent, item: WorkflowItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <Paper
      elevation={2}
      className="w-72 h-screen overflow-y-auto"
      sx={{
        borderRadius: 0,
        backgroundColor: "#f0f4f8",
      }}
    >
      <Box
        className="p-4 border-b border-gray-200"
        sx={{
          background: "linear-gradient(to right, #2563eb, #3b82f6)",
        }}
      >
        <Typography variant="h6" className="font-semibold text-white">
          Workflow Elements
        </Typography>
        <Typography variant="body2" className="text-blue-50">
          Drag elements to the canvas
        </Typography>
      </Box>

      <Box className="p-4 space-y-6">
        {workflowElements.map((category) => (
          <Box key={category.category}>
            <Typography
              variant="subtitle2"
              className="font-medium text-indigo-900 mb-3"
            >
              {category.category}
            </Typography>
            <Box className="space-y-2">
              {category.items.map((item) => (
                <Paper
                  key={item.name}
                  elevation={0}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-3 border border-gray-100 rounded-lg cursor-move 
                    hover:bg-gray-50 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                  sx={{
                    backgroundColor: item.icon.props.className.includes(
                      "text-red-600"
                    )
                      ? "#fee2e2"
                      : item.icon.props.className.includes("text-blue-400")
                      ? "#dbeafe"
                      : item.icon.props.className.includes("text-green-600")
                      ? "#d1fae5"
                      : "#ffffff",
                    "&:active": {
                      backgroundColor: "#f8fafc",
                      borderColor: "#94a3b8",
                    },
                  }}
                >
                  <Box className="flex items-center gap-2">
                    <Box className="rounded-full w-8 h-8 flex justify-center items-center bg-gray-100">
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        className="font-medium text-gray-900"
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-600">
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

      <Divider sx={{ backgroundColor: "#e2e8f0" }} />
      <Box className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <Typography variant="caption" className="text-gray-600">
          Drag and drop elements to create your workflow
        </Typography>
      </Box>
    </Paper>
  );
};

export default SideBar;

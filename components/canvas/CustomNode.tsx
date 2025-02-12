import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { CustomNodeProps } from "@/types/nodes";

const getNodeIcon = (name: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    YouTube: <YouTubeIcon className="text-red-600" />,
    Twitter: <TwitterIcon className="text-blue-400" />,
    Medium: <AutoStoriesIcon className="text-green-600" />,

    "Google Docs": <DescriptionIcon className="text-blue-600" />,
    Notion: <DescriptionIcon className="text-gray-800" />,
    Word: <DescriptionIcon className="text-blue-800" />,

    ChatGPT: <SmartToyIcon className="text-green-600" />,
    Claude: <PsychologyIcon className="text-purple-600" />,
    Gemini: <AutoAwesomeIcon className="text-blue-500" />,

    Dropbox: <CloudIcon className="text-blue-400" />,
    Drive: <StorageIcon className="text-green-500" />,
    OneDrive: <CloudIcon className="text-blue-600" />,
  };

  return iconMap[name] || <DescriptionIcon className="text-gray-400" />;
};

export const CustomNode = memo(({ data, isConnectable }: CustomNodeProps) => {
  const nodeIcon = getNodeIcon(data.name);

  return (
    <div className="relative group">
      <div className="px-6 py-4 shadow-lg rounded-xl bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 ease-in-out">
        <IconButton
          size="small"
          className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white shadow-md hover:bg-red-50 z-10"
          onClick={data.onDelete}
        >
          <CloseIcon className="text-red-500" sx={{ fontSize: 18 }} />
        </IconButton>

        <div className="flex items-center gap-4">
          <div className="rounded-xl w-14 h-14 flex justify-center items-center bg-gray-50 shadow-inner">
            {nodeIcon}
          </div>

          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800">
              {data.name}
            </div>
            <div className="text-sm text-gray-500">{data.description}</div>
          </div>
        </div>

        {!data.isFirstNode && (
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            className="w-3 h-3 -translate-x-0.5 !bg-blue-400 hover:!bg-blue-500 transition-colors"
          />
        )}
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 translate-x-0.5 !bg-blue-400 hover:!bg-blue-500 transition-colors"
        />
      </div>
    </div>
  );
});

CustomNode.displayName = "CustomNode";

export default CustomNode;

import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { WorkflowCategory } from "../types/workflow";

export const workflowElements: WorkflowCategory[] = [
  {
    category: "Content Platforms",
    items: [
      {
        name: "YouTube",
        description: "Video content platform",
        icon: <YouTubeIcon className="text-red-600" />,
      },
      {
        name: "Twitter",
        description: "Social media platform",
        icon: <TwitterIcon className="text-blue-400" />,
      },
      {
        name: "Medium",
        description: "Blogging platform",
        icon: <AutoStoriesIcon className="text-green-600" />,
      },
    ],
  },
  {
    category: "Document Tools",
    items: [
      {
        name: "Google Docs",
        description: "Document editor",
        icon: <DescriptionIcon className="text-blue-600" />,
      },
      {
        name: "Notion",
        description: "Workspace platform",
        icon: <DescriptionIcon className="text-gray-800" />,
      },
      {
        name: "Word",
        description: "Microsoft document editor",
        icon: <DescriptionIcon className="text-blue-800" />,
      },
    ],
  },
  {
    category: "AI Services",
    items: [
      {
        name: "ChatGPT",
        description: "AI language model",
        icon: <SmartToyIcon className="text-green-600" />,
      },
      {
        name: "Claude",
        description: "AI assistant",
        icon: <PsychologyIcon className="text-purple-600" />,
      },
      {
        name: "Gemini",
        description: "Google AI model",
        icon: <AutoAwesomeIcon className="text-blue-500" />,
      },
    ],
  },
  {
    category: "Storage",
    items: [
      {
        name: "Dropbox",
        description: "Cloud storage",
        icon: <CloudIcon className="text-blue-400" />,
      },
      {
        name: "Drive",
        description: "Google cloud storage",
        icon: <StorageIcon className="text-green-500" />,
      },
      {
        name: "OneDrive",
        description: "Microsoft storage",
        icon: <CloudIcon className="text-blue-600" />,
      },
    ],
  },
];

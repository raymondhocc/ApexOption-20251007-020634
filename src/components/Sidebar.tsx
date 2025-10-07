import { NavLink } from "react-router-dom";
import { BarChart2, Layers3, Settings, CandlestickChart } from "lucide-react";
import { cn } from "@/lib/utils";
const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart2 },
  { name: "Positions", href: "/positions", icon: Layers3 },
  { name: "Settings", href: "/settings", icon: Settings },
];
export function Sidebar() {
  return (
    <aside className="w-64 min-w-[256px] flex-shrink-0 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <NavLink to="/" className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <CandlestickChart className="h-8 w-8 text-blue-600" />
        <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
          Apex Options
        </h1>
      </NavLink>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 mt-auto text-center text-xs text-gray-400">
        Built with ❤️ at Cloudflare
      </div>
    </aside>
  );
}
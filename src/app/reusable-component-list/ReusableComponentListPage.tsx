"use client";

import VerticalTimeline from "@/components/timeline/VerticalTimeline";
import { MapPin, Plane, Camera } from "lucide-react";

function ReusableComponentListPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Trips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">3 planned</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Destinations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">visited this year</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Memories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">photos & videos</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Trip to Tokyo planned</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Added 15 photos from Paris
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
      <VerticalTimeline />
    </>
  );
}

export default ReusableComponentListPage;

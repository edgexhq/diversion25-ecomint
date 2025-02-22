import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  { id: 1, description: "Planted 500 trees in Amazon Rainforest", date: "2023-07-15" },
  { id: 2, description: "Received $10,000 grant from Green Earth Foundation", date: "2023-07-12" },
  { id: 3, description: "Launched new volunteer program in Indonesia", date: "2023-07-10" },
  { id: 4, description: "Completed reforestation project in California", date: "2023-07-05" },
  { id: 5, description: "Partnered with local schools for education initiative", date: "2023-07-01" },
]

export function RecentActivities() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex justify-between items-start">
            <div>
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-gray-500">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}


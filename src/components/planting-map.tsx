export function PlantingMap() {
  return (
    <div className="relative h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Map Placeholder</p>
      </div>
      <img
        src="/placeholder.svg?height=300&width=600"
        alt="Planting Locations Map"
        className="w-full h-full object-cover opacity-50"
      />
    </div>
  )
}


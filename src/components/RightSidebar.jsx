function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-1/4 min-h-screen border-l border-gray-800 p-6 text-white">

      <div className="bg-gray-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold mb-4">
          What's Happening
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500 text-sm">
              Trending in India
            </p>
            <h3 className="font-semibold">
              #ReactJS
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Technology
            </p>
            <h3 className="font-semibold">
              #WebDevelopment
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Sports
            </p>
            <h3 className="font-semibold">
              #Cricket
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Entertainment
            </p>
            <h3 className="font-semibold">
              #Movies
            </h3>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default RightSidebar;
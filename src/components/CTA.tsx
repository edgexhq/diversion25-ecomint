import { Badge } from "./ui/badge";

export default function CTA() {
  return (
    <div className="container">
      <div className="mx-auto max-w-screen-lg rounded-lg bg-gradient-to-t from-transparent to-primary/50 p-6 md:p-10">
        <div className="mb-8 flex items-center gap-3">
          <Badge>NGO</Badge>
        </div>
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="max-w-screen-sm text-3xl font-bold md:text-4xl">
            Explore our esteemed organisations
          </h2>
          <div className="md:text-right">
            <span className="text-3xl font-bold md:text-5xl">1000+</span>
            <p className="text-muted-foreground">Societal commitments</p>
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-8"
        ></div>
        <div>
          <p className="mb-5 text-muted-foreground">
            Launch your project with the following features:
          </p>
          <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
            <ul className="grid gap-x-20 gap-y-4 font-medium md:grid-cols-2">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check w-4"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Unlimited projects
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check w-4"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Live chat support
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check w-4"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Live Collaboration
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check w-4"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Custom domain
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check w-4"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Unlimited users
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check w-4"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Unlimited storage
              </li>
            </ul>
            <div className="flex flex-col gap-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">
                Book a demo
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

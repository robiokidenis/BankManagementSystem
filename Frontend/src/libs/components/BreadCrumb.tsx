import { useRouter } from "next/router";
import Link from "next/link";

type BreadcrumbProps = {
  className?: string;
};
const Breadcrumb = ({ className }: BreadcrumbProps) => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  // Remove # symbol from last path segment
  const lastSegment = pathSegments[pathSegments.length - 1]
    .replace("#", "")
    .split("?")[0];
  pathSegments[pathSegments.length - 1] = lastSegment;

  const breadcrumbs = pathSegments.map((_, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label =
      pathSegments[index].charAt(0).toUpperCase() +
      pathSegments[index].slice(1);
    return { url, label };
  });

  const handleBreadcrumbClick = (url: string) => {
    router.replace(url);
  };

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
        <li>
          <Link href="/">
            <span className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
              <svg
                className="w-5 h-5 mr-2.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </span>
          </Link>
        </li>
        {breadcrumbs.map(({ label, url }, i) => (
          <li key={url}>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {i === breadcrumbs.length - 1 ? (
                <span
                  className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link href={url}>
                  <span className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">
                    {label}
                  </span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

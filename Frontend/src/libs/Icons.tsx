import { FC } from "react";
import * as HIcons from "@heroicons/react/24/solid";

const DynamicHeroIcon: FC<{ icon: string; className: string }> = ({
  icon,
  className,
}) => {
  const icons: { [key: string]: any } = HIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className={className} aria-hidden="true" />
    </>
  );
};

export default DynamicHeroIcon;

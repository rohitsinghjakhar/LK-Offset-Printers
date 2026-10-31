/**
 * Class joiner for components that ship in the initial client bundle. Unlike cn() it does not
 * resolve Tailwind conflicts (that costs ~9 KB of tailwind-merge), so callers must not pass
 * classes that fight the base classes.
 */
export { clsx as cx } from "clsx";

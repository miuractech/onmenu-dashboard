function checkActiveSideNavItem(item: string) {
  const path = window.location.pathname.split("/")[1];
  return item === path;
}

export default checkActiveSideNavItem;

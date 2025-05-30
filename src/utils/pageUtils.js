import { PAGE_SIZES } from "../constants/pageSizes"

export const getPageDimensions = (size) => {
  const pageSize = PAGE_SIZES.find((s) => s.value === size)
  return pageSize ? { width: pageSize.width, height: pageSize.height } : { width: 1122, height: 794 }
}

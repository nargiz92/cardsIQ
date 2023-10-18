import { Ref, SVGProps, forwardRef } from 'react'
const EmptyStar = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    fill={'none'}
    height={16}
    ref={ref}
    viewBox={'0 0 20 21'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <path
      d={
        'M15.56 20a1 1 0 0 1-.46-.11L10 17.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83L9.1 1.56a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18ZM10 15.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L10 4.25 8.11 8a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04Z'
      }
      fill={'#e5ac39'}
    />
  </svg>
)
const ForwardRef = forwardRef(EmptyStar)

export { ForwardRef as EmptyStar }

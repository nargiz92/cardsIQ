import { Ref, SVGProps, forwardRef } from 'react'
const UsersIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={800}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={800}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={'M5 21a7 7 0 1 1 14 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'}
      stroke={'#fff'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)
const ForwardRef = forwardRef(UsersIcon)

export { ForwardRef as UsersIcon }

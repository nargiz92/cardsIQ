import { Ref, SVGProps, forwardRef } from 'react'
const CheckedIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={20}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={'M4 12.611 8.923 17.5 20 6.5'}
      stroke={'#000'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)
const ForwardRef = forwardRef(CheckedIcon)

export { ForwardRef as CheckedIcon }

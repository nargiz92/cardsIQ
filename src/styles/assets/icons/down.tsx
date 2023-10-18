import { Ref, SVGProps, forwardRef } from 'react'
const DownIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    fill={'none'}
    height={16}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <path
      d={
        'M5.514 9.458a1 1 0 0 1 1.64-.77l5.36 4.48 5.37-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.15 1.46l-6 4.83a1 1 0 0 1-1.27 0l-6-5a1 1 0 0 1-.36-.83Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(DownIcon)

export { ForwardRef as DownIcon }

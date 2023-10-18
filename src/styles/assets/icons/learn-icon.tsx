import { Ref, SVGProps, forwardRef } from 'react'
const LearnIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Z'}
      fill={'#f9f7ff'}
    />
    <path
      d={
        'M12.34 7.45a1.7 1.7 0 0 0-1.85-.3 1.6 1.6 0 0 0-1 1.48v6.74a1.6 1.6 0 0 0 1 1.48c.217.098.452.15.69.15a1.74 1.74 0 0 0 1.16-.45L16 13.18a1.6 1.6 0 0 0 0-2.36l-3.66-3.37Zm-.84 7.15V9.4l2.81 2.6-2.81 2.6Z'
      }
      fill={'#f9f7ff'}
    />
  </svg>
)
const ForwardRef = forwardRef(LearnIcon)

export { ForwardRef as LearnIcon }

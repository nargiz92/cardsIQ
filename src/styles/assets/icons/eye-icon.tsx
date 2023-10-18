import { Ref, SVGProps, forwardRef } from 'react'
const EyeIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d={'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'}
      stroke={'#fff'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
    <path
      d={
        'M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z'
      }
      stroke={'#fff'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)
const ForwardRef = forwardRef(EyeIcon)

export { ForwardRef as EyeIcon }

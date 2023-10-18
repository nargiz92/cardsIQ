import { Ref, SVGProps, forwardRef } from 'react'
const UserPenIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={30}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={30}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M11 15c-.882 0-1.72-.19-2.473-.532-.523-.236-.784-.355-.929-.396a1.715 1.715 0 0 0-.394-.07 3 3 0 0 0-.488.015 2.432 2.432 0 0 0-.25.031 3 3 0 0 0-2.418 2.418C4 16.73 4 17.048 4 17.684V19.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C4.76 21 5.04 21 5.6 21h2.8M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2.41 14 2.025-.405c.176-.035.265-.053.347-.085a.997.997 0 0 0 .207-.111c.072-.05.136-.114.263-.242L19.59 16a1.414 1.414 0 1 0-2-2l-4.158 4.157c-.127.128-.19.191-.241.264a.999.999 0 0 0-.11.207c-.033.082-.05.17-.086.347L12.59 21Z'
      }
      stroke={'#000'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)
const ForwardRef = forwardRef(UserPenIcon)

export { ForwardRef as UserPenIcon }

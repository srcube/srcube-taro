export default {
  '.icon-spinner': {
    '--svg': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z' opacity='0.25'/%3E%3Cpath fill='%23000' d='M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z'%3E%3CanimateTransform attributeName='transform' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/path%3E%3C/svg%3E")`,
    'display': 'inline-block',
    'width': '1em',
    'height': '1em',
    'background-color': 'currentColor',
    '-webkit-mask-image': 'var(--svg)',
    'mask-image': 'var(--svg)',
    '-webkit-mask-repeat': 'no-repeat',
    'mask-repeat': 'no-repeat',
    '-webkit-mask-size': '100% 100%',
    'mask-size': '100% 100%',
  },
}

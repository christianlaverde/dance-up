'use client';
import { createTheme } from '@mui/material/styles';

// export const theme = createTheme(
//     {
//         palette: {
//           mode: 'dark',
//           primary: {
//             main: '#344cb9',
//           },
//           secondary: {
//             main: '#9c27b0',
//           },
//           text: {
//             primary: '#f7f7f7',
//           },
//         },
//         shape: {
//           borderRadius: 4,
//         },
//         spacing: 8,
//         components: {
//           MuiSwitch: {
//             styleOverrides: {
//               root: {
//                 width: 46,
//                 height: 27,
//                 padding: 0,
//                 margin: 8,
//               },
//               switchBase: {
//                 padding: 1,
//                 '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
//                   transform: 'translateX(16px)',
//                   color: '#fff',
//                   '& + $track': {
//                     opacity: 1,
//                     border: 'none',
//                   },
//                 },
//               },
//               thumb: {
//                 width: 24,
//                 height: 24,
//               },
//               track: {
//                 borderRadius: 13,
//                 border: '1px solid #bdbdbd',
//                 backgroundColor: '#fafafa',
//                 opacity: 1,
//                 transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
//               },
//             },
//           },
//           MuiButton: {
//             styleOverrides: {
//               root: {
//                 background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//                 border: 0,
//                 borderRadius: 3,
//                 boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//                 color: 'white',
//                 height: 48,
//                 padding: '0 30px',
//               },
//             },
//           },
//         },
//       }
// )

export const customTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#344cb9',
        },
        secondary: {
          main: '#9c27b0',
        },
        text: {
          primary: '#f7f7f7',
        },
      },
      shape: {
        borderRadius: 4,
      },
      props: {
        MuiTooltip: {
          arrow: true,
        },
        MuiAppBar: {
          color: 'inherit',
        },
      },
      spacing: 8,
      components: {
        MuiSwitch: {
          styleOverrides: {
            root: {
              width: 46,
              height: 27,
              padding: 0,
              margin: 8,
            },
            switchBase: {
              padding: 1,
              '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + $track': {
                  opacity: 1,
                  border: 'none',
                },
              },
            },
            thumb: {
              width: 24,
              height: 24,
            },
            track: {
              borderRadius: 13,
              border: '1px solid #bdbdbd',
              backgroundColor: '#fafafa',
              opacity: 1,
              transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
          },
        },
      },
      overrides: {
        MuiAppBar: {
          colorInherit: {
            backgroundColor: '#000',
            color: '#fff',
          },
        },
      },
    
  });
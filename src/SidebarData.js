import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [

  {
    title: 'Diagnostico',
    path: '/dashboard/diagnostico',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    permiso: ['62dc479f69634f69540f421a','6323ec0fe3695dc227807221','6323ebe4e3695dc227807220']
  },
  {
    title: 'Tratamiento - Muy Pronto!!',
    path: '/dashboard/tratamiento',
    icon: <FaIcons.FaHeartbeat />,
    cName: 'nav-text',
    permiso: ['62dc479f69634f69540f421a','6323ec0fe3695dc227807221','6323ebe4e3695dc227807220']
  },

  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    permiso: ['62dc479f69634f69540f421a','6323ec0fe3695dc227807221','6323ebe4e3695dc227807220']
  },
  {
    title: 'Regitrar Doctor',
    path: '/dashboard/admin',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    permiso: ['6323ec0fe3695dc227807221']
  },

  {
    title: 'Registro de Pacientes',
    path: '/dashboard/doctor',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    permiso: ['6323ebe4e3695dc22780']
  },
 

  {
    title: 'Pacientes',
    path: '/dashboard/doctor/pacientes',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    permiso: ['6323ebe4e3695dc227807220']
  },
 
 


 
];



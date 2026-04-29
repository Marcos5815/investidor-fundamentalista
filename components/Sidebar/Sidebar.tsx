'use client'

import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export const Sidebar = () => {

    const pathname = usePathname()
    
    const page = (path: string) => {
        const isActive = pathname === path
        return isActive ? "contained" : undefined;
    }

    const iconColor = (path: string) => {
        const isActive = pathname === path
        return isActive ? "primary" : "success";
    }


    return(
        <Box component={Paper} className="ml-5 mt-10 w-30 h-221.7 flex flex-col items-center">
            <Box className="p-2 mt-5 ml-3">
                <Image src="/logo.png" width={80} height={25}  alt='Logo' />
            </Box>
            <Box className="mt-20 h-90 flex flex-col justify-around">
                <Link href="/dashboard">
                    <Button variant={page('/Profile')}><AccountBoxIcon color={iconColor('/dashboard')}/> </Button>
                </Link>
                <Link href="/finances">
                    <Button variant={page('/finances')}><AccountBalanceWalletIcon color={iconColor('/finances')}/> </Button>
                </Link>
                <Link href="/wallet">
                    <Button variant={page('/configuration')}><SettingsIcon color={iconColor('/wallet')}/></Button>
                </Link>
            </Box>
        </Box>
    )
}
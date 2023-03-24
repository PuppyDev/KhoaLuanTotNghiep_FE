import { setUserInfo } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { IUpdateID } from '@/models/auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: any }) => {
	// Get Authenticated here
	const { accessToken } = useAppSelector((state) => state.authSlice.userInfo)
	const dispatch = useAppDispatch()
	const userInfo = JSON.parse(localStorage.getItem('dataUser') as string)

	let isAuthenticated = accessToken || userInfo

	if (!accessToken && userInfo) {
		dispatch(setUserInfo(userInfo))
	}

	return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute

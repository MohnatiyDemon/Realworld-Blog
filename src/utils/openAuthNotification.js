import { notification } from 'antd'

const openAuthNotification = () => {
	notification.warning({
		message: 'Authorization Required',
		description: 'Please sign up or log in to like articles.',
		placement: 'topRight',
	})
}

export default openAuthNotification
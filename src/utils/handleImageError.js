import defaultAvatar from '../assets/images/defaultAvatar.svg'
const handleImageError = (e) => {
	e.target.src = defaultAvatar
}
export default handleImageError
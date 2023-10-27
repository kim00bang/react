import { Container } from 'react-bootstrap';
import './App.css';
import HeaderPage from './components/shop/HeaderPage';
import RouterPage from './components/shop/RouterPage';

const App = () => {
	const background = "/images/header02.png";
	return (
		<Container>
			<img src={background} width="100%" />
			<HeaderPage />
			<RouterPage />
		</Container>
	);
}

export default App;
//CD5C5C 인디안 레드 F08080 라이트 코랄 B0C4DE 라이트 스틸블루 00FF7F 스프링그린 00FA9A 미디엄 스프링그린
//20B2AA 라이트씨 그린 6B8E23 올리브드래브

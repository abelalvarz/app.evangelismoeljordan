import { PrimeReactProvider } from 'primereact/api'
import { ToastProvider } from "./context/providers/ToastProvider"
import { AuthProvider } from "./context/providers/AuthProvider";
import { LoadingProvider } from "./context/providers/LoadingProvider"
import { Router } from './components/Router';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

export const App = () => {

	return (
		<PrimeReactProvider value={{ unstyled: false }}>
			<AuthProvider>
				<ToastProvider>
					<LoadingProvider>
						<Router />
					</LoadingProvider>
				</ToastProvider>
			</AuthProvider>
		</PrimeReactProvider>

	)
}

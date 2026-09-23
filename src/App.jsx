import Desktop from './components/Desktop';
import Phone from './components/Phone';
import { useViewport } from './hooks';

// Below this width the fake desktop gets too small to use, so switch to the phone layout.
const PHONE_BREAKPOINT = 768;

function App() {
  const viewport = useViewport();
  return viewport.w < PHONE_BREAKPOINT ? <Phone /> : <Desktop viewport={viewport} />;
}

export default App;

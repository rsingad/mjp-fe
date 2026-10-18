import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import JoinSection from './components/JoinSection';
import Manifesto from './components/Manifesto';
import StoryTimeline from './components/StoryTimeline';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CampaignSlider from './components/CampaignSlider';
import FlySwarmCanvas from './components/FlySwarmCanvas';

export default function App() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      <FlySwarmCanvas />
      <Navbar onJoin={scrollToJoin} />
      <Ticker />
      <Hero onJoin={scrollToJoin} />
      <CampaignSlider/>
      <JoinSection />
      <Manifesto />
      <StoryTimeline />
      <FaqSection />
      <Footer />
    </div>
  );
}
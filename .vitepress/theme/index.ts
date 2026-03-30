import DefaultTheme from 'vitepress/theme';
import './custom.css';
import Roadmap from './components/Roadmap.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('Roadmap', Roadmap);
  }
};

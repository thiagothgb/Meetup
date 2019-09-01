import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meet, user } = data;
    const { title, manager, date } = meet;

    await Mail.sendMail({
      to: `${manager.name} <${manager.email}>`,
      subject: 'Nova inscrição ao evento',
      template: 'subscription',
      context: {
        manager: manager.name,
        title,
        name: user.name,
        email: user.email,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SubscriptionMail();

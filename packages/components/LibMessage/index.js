/*
 * @Author: qin
 * @Date: 2022-11-06 22:55:48
 * @LastEditTime: 2022-11-06 23:20:14
 * @FilePath: /ui-lib/packages/components/LibMessage/index.js
 *  -> The best way to explain it is to do it
 */
import { h, render } from 'vue';
import Message from './index.vue';

const message = ({
  type,
  text,
  icon,
  textColor,
  bgColor,
  timeout,
}) => {
  if (text) {
    const oDiv = document.createElement('div');
    oDiv.setAttribute('class', 'xxx-message-wrapper');

    document.body.appendChild(oDiv);
    let timer = null;

    const VNode = h(
      Message,
      {
        text,
        type,
        timeout,
        bgColor,
        textColor,
        icon,
      },
      {
        default: () => [text],
      },
    );
    render(VNode, oDiv);

    clearTimeout(timer);
    timer = setTimeout(() => {
      render(null, oDiv);
      document.body.removeChild(oDiv);
      clearTimeout(timer);
      timer = null;
    }, timeout ?? 2500);
  }
};

export default message;

import React from 'react'
import ReactDOM from 'react-dom'
import ToastContainer from './ToastContainer'

export const toastManager = {
  subscribe(callback) {
    this.callback = callback;
  },
  defaultOptions() {
    return {
      delay: 0,
      timeout: 2000,
      position: "top-center"
    };
  },
  add(content, options) {
    if(!this.callback && !this.createdToastContainer) {
      this.createdToastContainer = true
      const node = document.createElement('div')
      node.setAttribute('id', 'temp-unused-react-tiny-toast-AdcCALhu9324da0232fkarkzkdn')
      document.body.appendChild(node)
      ReactDOM.render(<ToastContainer />, node)
      return this.add(content, options)
    }

    const mergedOptions = { ...this.defaultOptions(), ...options };
    const timeoutId = setTimeout(() => {
      this.callback('ADD', content, {...mergedOptions, id: timeoutId});
    }, mergedOptions.delay);
    return timeoutId;
  },
  remove(id) {
    this.callback('REMOVE', null, { id })
    return true;
  }
};
  
const toast = {
  show: (content, options={}) => {
    return toastManager.add(content, options)
  },
  remove: (id) => {
    return toastManager.remove(id)
  }
}

export default toast;

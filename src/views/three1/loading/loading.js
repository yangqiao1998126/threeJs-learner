import LoadingComponent from './loading.vue'

const Loading = {}

// 注册Loading
Loading.install = function(Vue) {
  const LoadingConstructor = Vue.extend(LoadingComponent)
  const instance = new LoadingConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$loading1 = {
    show: message => {
      instance.show = true
      instance.message = message
    },
    hide: delay => {
      setTimeout(() => {
        instance.show = false
      }, delay)
    }
  }
}

export default Loading

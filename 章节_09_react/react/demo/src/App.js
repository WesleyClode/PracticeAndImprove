// import Fzindex from './01fzProps'
// import Context from './02context'
// import EventBus from './03eventBus'
// import Button from './04lifeCycle/button'
// import HOCComponent from './05HOCComponent'
// import HookFile from './06Hooks'
import ReduxComponent from './07Redux'

function App() {
  return (
    <div>
      App page
      {/* <p>下面是父子组件props传值和校验</p>
      <Fzindex/>
      <hr/> */}

      {/* <p>下面是跨组件用context传值</p>
      <Context/>
      <hr/> */}
       
      {/* <p>下面是组件用eventBus传值</p>
      <EventBus />
      <hr/>  */}

      {/* <p>下面是生命周期组件的例子</p>
      <Button name='张三'/> */}
      {/* {
        false ? <Button name='casey'/> : 'haha'
      } */}

      {/* <p>下面是高阶函数/高阶组件</p>
      <HOCComponent />
      <hr/>  */}

      {/* <p>下面是Hooks</p>
      <HookFile />
      <hr/>  */}

      <p>下面是ReduxComponent</p>
      <ReduxComponent />
      <hr/> 
      
    </div>
  );
}

export default App;

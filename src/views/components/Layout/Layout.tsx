import './Layout.css';

interface Props {
  children:any
}

const Layout = (props:Props) => {
  return (
      <>
        <div className='layout'>{props.children}</div>
      </>
  )
}

export default Layout

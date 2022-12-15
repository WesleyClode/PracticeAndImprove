function InputDom(props) {
  return (
    <div>
      <input name="name" {...props.name} />
      <div>{props.newName}</div>
    </div>
  )
}
export default InputDom
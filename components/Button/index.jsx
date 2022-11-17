import { Container } from "./styles";

const Button = ({ children, whiteSchema = false, ...rest }) => {
  return (
    <Container  type="button" whiteSchema={whiteSchema} {...rest}>
      {children}
    </Container>
  );
};

export default Button;
import { Html, Heading, Text } from '@react-email/components';

const OrderMarkedEmail = () => (
  <Html>
    <Heading as="h1">Order Marked</Heading>
    <Text>Hello</Text>
    <Text>Your order has been marked, thanks for visiting</Text>
  </Html>
);

export default OrderMarkedEmail;

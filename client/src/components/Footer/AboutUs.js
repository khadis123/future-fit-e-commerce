import styled from "styled-components";

//Component containing simple information about Future-Fit
const AboutUs = () => {
  return (
    <Wrapper>
      <Title>About Us</Title>
      <Box>
        <Section>
          <SectionText>
            Welcome to FutureFit! We are a team of innovators and tech
            enthusiasts who are dedicated to creating high-quality technological
            products for a variety of industries. Our products are designed to
            improve the lives of people and animals alike, making it easier for
            them to stay healthy, active, and entertained.
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionText>
            Our team of experts is dedicated to developing cutting-edge products
            that address the needs of our customers in a variety of areas, from
            monitoring health and wellness to improving home entertainment
            experiences. We work tirelessly to stay on the forefront of
            technological advancements and to bring the latest and greatest
            products to market.
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>Our Commitment</SectionTitle>
          <SectionText>
            We are passionate about creating products that make a real
            difference in the lives of our customers. Whether you're looking to
            improve your fitness, monitor your health, or entertain your pets,
            we have the perfect solution for you. With a focus on quality,
            performance, and reliability, our products are designed to exceed
            your expectations.
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>Customer Service</SectionTitle>
          <SectionText>
            At FutureFit, we are committed to providing exceptional customer
            service and support. We are here to answer your questions, provide
            technical assistance, and help you get the most out of your
            products. We believe in building strong relationships with our
            customers and strive to deliver an experience that exceeds your
            expectations.
          </SectionText>
        </Section>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 48px;
`;

const Box = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  padding: 24px;
  max-width: 600px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
`;

const SectionText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export default AboutUs;

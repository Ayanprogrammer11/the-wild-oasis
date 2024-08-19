import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ButtonText from "../ui/ButtonText";
import ButtonIcon from "../ui/ButtonIcon";
import { IoCloudyNight } from "react-icons/io5";
import Checkbox from "../ui/Checkbox";
import FileInput from "../ui/FileInput";
import Tag from "../ui/Tag";
function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <p>TEST</p>

        <ButtonText>Button Text</ButtonText>
        <ButtonIcon>
          <IoCloudyNight />
          Button Icon
        </ButtonIcon>
      </Row>
      <Row>
        <Checkbox checked={true} onChange={() => {}} id={2} disabled={false}>
          Checkbox
        </Checkbox>
        <FileInput type="file" />
        <Tag type="red">Deletion</Tag>
      </Row>
    </>
  );
}

export default Dashboard;

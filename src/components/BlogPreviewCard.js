import {Card} from "react-bootstrap";
import blog_header from "../static/images/blog_thumbnail.png";
import {Link} from "react-router-dom";

export default function BlogPreviewCard() {
    return(
        <Card>
            <h5>featured blogs</h5>
            <Card.Header>
                <Card.Img src={blog_header}></Card.Img>
            </Card.Header>
            <Card.Body>
                <Card.Title>Understanding the Impact of Trauma</Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices ut mi nec cursus. 
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link to={'#somewhere'} className={'nav-link'}>Read More</Link>
            </Card.Footer>

        </Card>
    );
}
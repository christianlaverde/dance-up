import { Button } from 'react-bootstrap'
import './styles.css'

export default function Jumbotron() {
    return (
        <div className="jumbotron">
            <div className="content">
                <h1>Place head line here</h1>
                <p>Place sub head line here</p>
                <Button variant="primary" href='#footer'>Learn more</Button>
            </div>
        </div>
    )
}
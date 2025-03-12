import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutBanner = () => {
    return (
        <div>
            About Banner
            <Button className="">Click me</Button>
            <Link href="/">Home</Link>
        </div>
    );
};

export default AboutBanner;
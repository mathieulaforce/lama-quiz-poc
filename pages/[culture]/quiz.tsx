import { Box } from '@mui/material';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import { TileTemplate } from '../../templates/tileTemplate';
import { fetchQuizesByCulture } from '../api/apiLanguages';
import QuizTile from './../../components/tiles/quizTile';

export async function getServerSideProps(context: any) {
    const culture = context.params!.culture as string;
    const quizes = await fetchQuizesByCulture(culture)
    return {
        props: {
            culture: culture,
            quizes: quizes
        }
    }
}

const QuizSelection: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return (
        <>
            <Head>
                <title>Quiz selection</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <TileTemplate maxItemsOnPage={8}>
                {props.quizes.map(quiz => <Box key={quiz.id}>
                    <Link href={`/${props.culture}/${quiz.slug}`}><QuizTile  {...quiz} /></Link>
                </Box>)}
            </TileTemplate>
        </>
    )
}

export default QuizSelection;
